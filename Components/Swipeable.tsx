import React, { Component, PropsWithChildren } from "react";
import { Animated, StyleSheet, I18nManager, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { RectButton, Swipeable } from "react-native-gesture-handler";

export default class GmailStyleSwipeableRow extends Component<
  PropsWithChildren<unknown & { onDelete: () => void }>
> {
  private renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    return (
      <RectButton style={styles.rightAction} onPress={this.close}>
        {/* Change it to some icons */}
        <Ionicons
          name="trash-outline"
          size={24}
          color="#fff"
          style={{ marginRight: 10 }}
        />
      </RectButton>
    );
  };

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };

  private close = () => {
    this.swipeableRow?.close();
    this.props.onDelete();
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
    backgroundColor: "plum",
    height: 20,
  },
  rightAction: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    backgroundColor: "#dd2c00",
    flex: 1,
    justifyContent: "flex-end",
  },
});
