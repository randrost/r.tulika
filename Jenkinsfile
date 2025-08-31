pipeline {
    agent any

    environment {
        REGISTRY = "registry.licendra.com"
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
