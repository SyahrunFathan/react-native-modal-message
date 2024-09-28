import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, ILWarnIcon } from './assets';

const ModalConfirm = ({
  visible,
  buttonBack,
  buttonAction,
  textConfirm,
  textSave,
  textHeader,
  textCancel,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Image source={ILWarnIcon} style={{ width: 40, height: 40 }} />
            <Text style={styles.textBold}>{textHeader}</Text>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.textNormal}>{textConfirm}</Text>
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity onPress={buttonBack}>
              <Text style={{ fontSize: 16, color: COLORS.grey }}>
                {textCancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={buttonAction}>
              <Text style={{ fontSize: 16, color: COLORS.red }}>
                {textSave}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const useConfirmModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonAction, setButtonAction] = useState(
    () => () => setIsVisible(false)
  );
  const [textCancel, setTextCancel] = useState('');
  const [textSave, setTextSave] = useState('');
  const [textHeader, setTextHeader] = useState('');
  const [textConfirm, setTextConfirm] = useState('');

  const showModalConfirm = (
    textHeader,
    textConfirm,
    textCancel,
    textSave,
    buttonAction
  ) => {
    setTextHeader(textHeader);
    setTextConfirm(textConfirm);
    setTextCancel(textCancel);
    setTextSave(textSave);
    setButtonAction(() => buttonAction || (() => setIsVisible(false)));
    setIsVisible(true);
  };

  const ConfirmModal = (
    <ModalConfirm
      visible={isVisible}
      textCancel={textCancel}
      textConfirm={textConfirm}
      textSave={textSave}
      textHeader={textHeader}
      buttonAction={() => {
        buttonAction();
        setIsVisible(false);
      }}
      buttonBack={() => setIsVisible(false)}
    />
  );

  return { showModalConfirm, ConfirmModal };
};

export default useConfirmModal;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  modalHeader: {
    padding: 10,
    backgroundColor: COLORS.red,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  textBold: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
  modalBody: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  textNormal: {
    color: COLORS.greyOld,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
  },
  modalFooter: {
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 30,
    marginHorizontal: 10,
  },
});
