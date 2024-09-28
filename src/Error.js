import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, ILErrorIcon } from './assets';

const Error = ({ isVisible, onClick, text, textButton }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <View style={styles.modalHeader}>
              <Image source={ILErrorIcon} style={styles.icon} />
            </View>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.textBold}>Error!</Text>
            <Text style={styles.textNormal}>{text}</Text>
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity onPress={onClick} style={styles.button}>
              <Text style={styles.textButton}>{textButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const useErrorModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [textButton, setTextButton] = useState('');
  const [onClick, setOnClick] = useState(() => () => setIsVisible(false));

  const showErrorModal = (message, buttonLabel, buttonAction) => {
    setText(message);
    setTextButton(buttonLabel || 'Oke');
    setOnClick(() => buttonAction || (() => setIsVisible(false)));
    setIsVisible(true);
  };

  const ErrorModal = (
    <Error
      isVisible={isVisible}
      text={text}
      textButton={textButton}
      onClick={() => {
        onClick();
        setIsVisible(false);
      }}
    />
  );

  return { showErrorModal, ErrorModal };
};

export default useErrorModal;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    width: 300,
    height: 320,
    borderRadius: 12,
  },
  modalHeader: {
    width: 80,
    height: 80,
    marginTop: -40,
  },
  modalBody: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalFooter: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  textBold: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.red,
  },
  textNormal: {
    fontSize: 18,
    color: COLORS.red,
    fontWeight: '300',
  },
  button: {
    paddingHorizontal: 80,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: COLORS.red,
  },
  textButton: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  content: {
    alignItems: 'center',
  },
});
