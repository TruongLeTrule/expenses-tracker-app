import { Text, Modal, Button } from "react-native";
import React from "react";
import useStore from "../../hooks/useStore";

const EditModal = () => {
  const modalVisible = useStore((state) => state.modalVisible);
  const setModalVisible = useStore((state) => state.setModalVisible);

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      style={{ height: "40%", backgroundColor: "red" }}
    >
      <Text>EditModal</Text>
      <Button title="close" onPress={setModalVisible} />
    </Modal>
  );
};

export default EditModal;
