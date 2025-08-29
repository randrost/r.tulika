import {trigger, state, style, transition, animate} from "@angular/animations";

export const TRANSITION_TEXT_ENTER = trigger('transitionTextEnter', [
  state('in', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(100%)',
    }),
    animate(
      '800ms {{animDelay}}ms cubic-bezier(.11,.43,.24,1.02)', // cubic-bezier(.14,.32,.63,.99)
    ),
  ]),
])

export const TRANSITION_TEXT = trigger('transitionText', [
  state('true', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  state('false', style({
    opacity: 0,
    transform: 'translateY(100%)'
  })),
  transition('false => true', [
    animate(
      '800ms {{animDelay}}ms cubic-bezier(.11,.43,.24,1.02)', // cubic-bezier(.14,.32,.63,.99)
    ),
  ]),
])

export const TRANSITION_REVEAL = trigger('transitionReveal', [
  state('true', style({
    opacity: 1,
  })),
  state('false', style({
    opacity: 0,
  })),
  transition('false => true', [
    animate(
      '800ms {{animDelay}}ms cubic-bezier(.11,.43,.24,1.02)', // cubic-bezier(.14,.32,.63,.99)
    ),
  ]),
])


export const TRANSITION_TEXT_ROTATE = trigger('transitionTextRotate', [
  state('true', style({
    opacity: 1,
    transform: 'translateY(0) rotate(0deg) skewY(0deg)'
  })),
  state('false', style({
    opacity: 0,
    transform: 'translateY(100%) rotate(0deg) skewY({{textSkewAngle}}deg)'
  }), {params: {textSkewAngle: 0}}),
  transition('false => true',
    animate('800ms {{animDelay}}ms cubic-bezier(.11,.43,.24,1.02)'),
  )
])

export const TRANSITION_AREA_SLIDE = trigger('transitionAreaSlide', [
  state('true', style({
    transform: 'scaleX(1)'
  })),
  state('false', style({
    transform: 'scaleX(0)'
  })),
  transition('false => true',
    animate('400ms {{animDelay}}ms cubic-bezier(.13,.63,.37,1)'),
  ),
])

export const TRANSITION_IMAGE_SCALE = trigger('transitionImageScale', [
  state('true', style({
    opacity: 1,
    transform: 'scale(1)'
  })),
  state('false', style({
    opacity: 0,
    transform: 'scale(1.1)'
  })),
  transition('false => true', [
    animate(
      '600ms {{animDelay}}ms cubic-bezier(.24,.63,.4,.99)',
    ),
  ]),
])

export const ENTER_SCALE = trigger('enterScale', [
  state('in', style({
    opacity: 1,
    transform: 'scale(1)'
  })),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(1.1)',
    }),
    animate(
      '600ms {{animDelay}}ms cubic-bezier(.24,.63,.4,.99)',
    ),
  ]),
])


export const ENTER_FORM_TOP = trigger('transitionFromTop', [
  state('in', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-100%)'
    }),
    animate(
      '600ms {{animDelay}}ms cubic-bezier(.24,.63,.4,.99)',
    ),
  ]),
])
