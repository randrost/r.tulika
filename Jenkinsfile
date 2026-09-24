pipeline {
    agent any

    environment {
        REGISTRY = "registry.tulikas.de"
        IMAGE_NAME = "r-tulika"
        DOCKER_CREDENTIALS_ID = "docker-registry-credentials"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def apiKey = credentials('MY_API_KEY_CREDENTIAL_ID')
                    writeFile file: 'src/environments/environment.prod.ts', text: """
                      export const environment = {
                        production: true,
                        apiKey: "${apiKey}"
                      };
                    """
                    dockerImage = docker.build("${REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY}", "${DOCKER_CREDENTIALS_ID}") {
                        dockerImage.push()
                        dockerImage.push("latest") // optional: tag latest
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Plain kubectl apply -- no Helm chart for this app. Jenkins
                // agent has docker/git but not kubectl.
                sh '''
                    if ! command -v kubectl >/dev/null 2>&1 && [ ! -x "$WORKSPACE/bin/kubectl" ]; then
                        mkdir -p "$WORKSPACE/bin"
                        curl -fsSL -o "$WORKSPACE/bin/kubectl" https://dl.k8s.io/release/v1.31.0/bin/linux/amd64/kubectl
                        chmod +x "$WORKSPACE/bin/kubectl"
                    fi
                '''
                withCredentials([usernamePassword(credentialsId: 'infra-repo-readonly', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                    sh 'rm -rf infra && git clone --depth 1 https://${GIT_USER}:${GIT_TOKEN}@github.com/randrost/tls-infra.git infra'
                }
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh """
                        export PATH="\$WORKSPACE/bin:\$PATH"
                        sed 's#registry.tulikas.de/r-tulika:latest#registry.tulikas.de/r-tulika:${env.BUILD_NUMBER}#' \
                          infra/apps/r-tulika/manifest.yaml | kubectl apply -f -
                        # Plain kubectl has no --atomic equivalent -- roll back
                        # explicitly if the new pods never go healthy, instead
                        # of leaving a broken rollout live.
                        kubectl rollout status deployment/r-tulika -n r-tulika --timeout=120s \
                          || (kubectl rollout undo deployment/r-tulika -n r-tulika && exit 1)
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "✅ Build and push successful!"
        }
        failure {
            echo "❌ Build or push failed."
        }
    }
}
