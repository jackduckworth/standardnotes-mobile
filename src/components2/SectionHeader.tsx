import React from 'react';
import {
  Text,
  Platform,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import ThemedComponent from '@Root/components2/ThemedComponent';
import { StyleKit } from '@Style/StyleKit';

type Props = {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonAction?: () => void;
  buttonStyles?: ViewStyle | TextStyle;
  tinted?: boolean;
  backgroundColor?: ViewStyle['backgroundColor'];
  foregroundColor?: string;
};

export default class SectionHeader extends ThemedComponent<Props> {
  styles!: Record<string, ViewStyle | TextStyle>;
  render() {
    let title = this.props.title;
    if (Platform.OS === 'ios') {
      title = title.toUpperCase();
    }
    return (
      <View
        style={[
          this.styles.container,
          {
            backgroundColor: this.props.backgroundColor,
            color: this.props.foregroundColor,
          },
        ]}
      >
        <View>
          <Text
            style={[
              this.styles.title,
              this.props.tinted
                ? {
                    color: this.context!.getThemeService().variables
                      .stylekitInfoColor,
                  }
                : null,
            ]}
          >
            {title}
          </Text>
          {this.props.subtitle && (
            <Text style={this.styles.subtitle}>{this.props.subtitle}</Text>
          )}
        </View>
        {this.props.buttonText && (
          <TouchableOpacity
            style={this.styles.buttonContainer}
            onPress={this.props.buttonAction}
          >
            <Text style={[this.styles.button, this.props.buttonStyles]}>
              {this.props.buttonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  loadStyles() {
    const styleVariables = this.context!.getThemeService().variables;
    this.styles = {
      container: {
        flex: 1,
        flexGrow: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: StyleKit.constants.paddingLeft,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: styleVariables.stylekitBackgroundColor,
      },

      title: {
        backgroundColor: styleVariables.stylekitBackgroundColor,
        fontSize: StyleKit.constants.mainTextFontSize - 4,
        paddingLeft: StyleKit.constants.paddingLeft,
        color: styleVariables.stylekitNeutralColor,
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal',
      },

      subtitle: {
        backgroundColor: styleVariables.stylekitBackgroundColor,
        fontSize: StyleKit.constants.mainTextFontSize - 5,
        marginTop: 4,
        paddingLeft: StyleKit.constants.paddingLeft,
        color: styleVariables.stylekitNeutralColor,
      },

      buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },

      button: {
        color: styleVariables.stylekitInfoColor,
      },

      titleAndroid: {
        fontSize: StyleKit.constants.mainTextFontSize - 2,
        color: styleVariables.stylekitInfoColor,
      },
    };
  }
}