<template>
    <div>
      <van-nav-bar title="拼图" left-arrow @click-left="$router.go(-1)" placeholder fixed/>
      <div class="camera">
        <div class="board">
          <div class="cube">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-12">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-1">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top">
              <div class="clip clip-1"><span class="char-1">大</span></div>
            </div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-2">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top">
              <div class="clip clip-2"><span class="char-1">大</span></div>
            </div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-11">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-3">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top">
              <div class="clip clip-3"><span class="char-1">大</span><span class="char-2">前</span></div>
            </div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-4">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top">
              <div class="clip clip-4"><span class="char-1">大</span><span class="char-2">前</span></div>
            </div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-13">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-10">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-5">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top">
              <div class="clip clip-5"><span class="char-2">前</span><span class="char-3">端</span></div>
            </div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-6">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top">
              <div class="clip clip-6"><span class="char-2">前</span><span class="char-3">端</span></div>
            </div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-14">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-9">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-7">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top">
              <div class="clip clip-7"><span class="char-3">端</span></div>
            </div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube cube-8">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top">
              <div class="clip clip-8"><span class="char-3">端</span></div>
            </div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube invisible">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
          <div class="cube">
            <div class="face cube__front"></div>
            <div class="face cube__back"></div>
            <div class="face cube__right"></div>
            <div class="face cube__left"></div>
            <div class="face cube__top"></div>
            <div class="face cube__bottom"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PuzzleGame'
}
</script>

<!--<style scoped lang="scss">-->
<!--  body {-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--    align-items: center;-->
<!--    min-height: 100vh;-->
<!--    margin: 0;-->
<!--    background: var(&#45;&#45;grey-color-4);-->
<!--  }-->

<!--  *,-->
<!--  *::after,-->
<!--  *::before {-->
<!--    box-sizing: border-box;-->
<!--    transform-style: preserve-3d;-->
<!--  }-->

<!--  :root {-->
<!--    &#45;&#45;red-color: #ae2a4a;-->
<!--    &#45;&#45;grey-color-1: #979797;-->
<!--    &#45;&#45;grey-color-2: #959595;-->
<!--    &#45;&#45;grey-color-3: #e0dfe0;-->
<!--    &#45;&#45;grey-color-4: #dadada;-->
<!--  }-->

<!--  @mixin cube($width, $height, $depth) {-->
<!--    width: var($width);-->
<!--    height: var($height);-->

<!--    &__front {-->
<!--      @include cube-front($width, $height, $depth);-->
<!--    }-->
<!--    &__back {-->
<!--      @include cube-back($width, $height, $depth);-->
<!--    }-->
<!--    &__right {-->
<!--      @include cube-right($width, $height, $depth);-->
<!--    }-->
<!--    &__left {-->
<!--      @include cube-left($width, $height, $depth);-->
<!--    }-->
<!--    &__top {-->
<!--      @include cube-top($width, $height, $depth);-->
<!--    }-->
<!--    &__bottom {-->
<!--      @include cube-bottom($width, $height, $depth);-->
<!--    }-->
<!--    .face {-->
<!--      position: absolute;-->
<!--      border-radius: 4px;-->
<!--    }-->
<!--  }-->

<!--  @mixin cube-front($width, $height, $depth) {-->
<!--    width: var($width);-->
<!--    height: var($height);-->
<!--    transform-origin: bottom left;-->
<!--    transform: rotateX(-90deg)-->
<!--    translateZ(calc(calc(var(#{$depth}) * 2) - var(#{$height})));-->
<!--  }-->

<!--  @mixin cube-back($width, $height, $depth) {-->
<!--    width: var($width);-->
<!--    height: var($height);-->
<!--    transform-origin: top left;-->
<!--    transform: rotateX(-90deg) rotateY(180deg)-->
<!--    translateX(calc(var(#{$width}) * -1)) translateY(calc(var(#{$height}) * -1));-->
<!--  }-->

<!--  @mixin cube-right($width, $height, $depth) {-->
<!--    width: calc(var(#{$depth}) * 2);-->
<!--    height: var($height);-->
<!--    transform-origin: top left;-->
<!--    transform: rotateY(90deg) rotateZ(-90deg) translateZ(var(#{$width}))-->
<!--    translateX(calc(var(#{$depth}) * -2)) translateY(calc(var(#{$height}) * -1));-->
<!--  }-->

<!--  @mixin cube-left($width, $height, $depth) {-->
<!--    width: calc(var(#{$depth}) * 2);-->
<!--    height: var($height);-->
<!--    transform-origin: top left;-->
<!--    transform: rotateY(-90deg) rotateZ(90deg)-->
<!--    translateY(calc(var(#{$height}) * -1));-->
<!--  }-->

<!--  @mixin cube-top($width, $height, $depth) {-->
<!--    width: var($width);-->
<!--    height: calc(var(#{$depth}) * 2);-->
<!--    transform-origin: top left;-->
<!--    transform: translateZ(var($height));-->
<!--  }-->

<!--  @mixin cube-bottom($width, $height, $depth) {-->
<!--    width: var($width);-->
<!--    height: calc(var(#{$depth}) * 2);-->
<!--    transform-origin: top left;-->
<!--    transform: rotateY(180deg) translateX(calc(var(#{$width}) * -1));-->
<!--  }-->

<!--  .cube {-->
<!--    &#45;&#45;cube-width: 3rem;-->
<!--    &#45;&#45;cube-height: 1rem;-->
<!--    &#45;&#45;cube-depth: 1.5rem;-->

<!--    @include cube(&#45;&#45;cube-width, &#45;&#45;cube-height, &#45;&#45;cube-depth);-->

<!--    &__front {-->
<!--      background-color: var(&#45;&#45;grey-color-1);-->
<!--    }-->
<!--    &__back {-->
<!--      background-color: var(&#45;&#45;grey-color-3);-->
<!--    }-->
<!--    &__right {-->
<!--      background-color: var(&#45;&#45;grey-color-1);-->
<!--    }-->
<!--    &__left {-->
<!--      background-color: var(&#45;&#45;grey-color-2);-->
<!--    }-->
<!--    &__top {-->
<!--      background-color: var(&#45;&#45;grey-color-3);-->
<!--      overflow: hidden;-->
<!--    }-->
<!--    &__bottom {-->
<!--      background-color: var(&#45;&#45;grey-color-2);-->
<!--    }-->
<!--  }-->

<!--  .camera {-->
<!--    perspective: 300px;-->
<!--    transform: scale(3);-->
<!--  }-->

<!--  .board {-->
<!--    &#45;&#45;board-row: 4;-->
<!--    &#45;&#45;board-col: 6;-->
<!--    position: relative;-->
<!--    display: grid;-->
<!--    grid-template-rows: repeat(var(&#45;&#45;board-row), 1fr);-->
<!--    grid-template-columns: repeat(var(&#45;&#45;board-col), 1fr);-->
<!--    width: 18rem;-->
<!--    height: 12rem;-->
<!--    transform: rotateX(45deg);-->
<!--  }-->

<!--  .clip {-->
<!--    position: relative;-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    font-size: 4rem;-->
<!--    line-height: 1;-->
<!--    color: var(&#45;&#45;red-color);-->
<!--    user-select: none;-->

<!--    &-1 {-->
<!--    text-align: right;-->
<!--    left: 38%;-->
<!--  }-->

<!--  &-2 {-->
<!--  right: 61%;-->
<!--  }-->

<!--  &-3 {-->
<!--  text-align: right;-->
<!--  left: 38%;-->
<!--  bottom: 100%;-->
<!--  }-->

<!--  &-4 {-->
<!--  right: 61%;-->
<!--  bottom: 100%;-->
<!--  }-->

<!--  &-5 {-->
<!--  text-align: right;-->
<!--  left: 38%;-->
<!--  bottom: 68%;-->
<!--  }-->

<!--  &-6 {-->
<!--  right: 61%;-->
<!--  bottom: 68%;-->
<!--  }-->

<!--  &-7 {-->
<!--  text-align: right;-->
<!--  left: 38%;-->
<!--  bottom: 35%;-->
<!--  }-->

<!--  &-8 {-->
<!--  right: 61%;-->
<!--  bottom: 35%;-->
<!--  }-->
<!--  }-->

<!--</style>-->
