import React from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {FadeIn, FadeInDown, FadeOut} from 'react-native-reanimated'
import {ComposePost} from '../com/composer/Composer'
import {useComposerState} from 'state/shell/composer'
import {usePalette} from 'lib/hooks/usePalette'
import {useWebMediaQueries} from 'lib/hooks/useWebMediaQueries'
import {useWebBodyScrollLock} from '#/lib/hooks/useWebBodyScrollLock'

const BOTTOM_BAR_HEIGHT = 61

export function Composer({}: {winHeight: number}) {
  const pal = usePalette('default')
  const {isMobile} = useWebMediaQueries()
  const state = useComposerState()
  const isActive = !!state
  useWebBodyScrollLock(isActive)

  // rendering
  // =

  if (!isActive) {
    return <View />
  }

  return (
    <Animated.View
      style={styles.mask}
      aria-modal
      accessibilityViewIsModal
      entering={FadeIn.duration(100)}
      exiting={FadeOut}>
      <Animated.View
        entering={FadeInDown.duration(150)}
        exiting={FadeOut}
        style={[
          styles.container,
          isMobile && styles.containerMobile,
          pal.view,
          pal.border,
        ]}>
        <ComposePost
          replyTo={state.replyTo}
          quote={state.quote}
          onPost={state.onPost}
          mention={state.mention}
        />
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  mask: {
    // @ts-ignore
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000c',
    alignItems: 'center',
  },
  container: {
    marginTop: 50,
    maxWidth: 600,
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 2,
    borderRadius: 8,
    marginBottom: 0,
    borderWidth: 1,
    // @ts-ignore web only
    maxHeight: 'calc(100% - (40px * 2))',
  },
  containerMobile: {
    borderRadius: 0,
    marginBottom: BOTTOM_BAR_HEIGHT,
    // @ts-ignore web only
    maxHeight: `calc(100% - ${BOTTOM_BAR_HEIGHT}px)`,
  },
})
