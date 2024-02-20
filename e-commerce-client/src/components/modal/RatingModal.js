import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => state);
  const [modalVisible, setModalVisible] = useState(false);

  const history = useHistory();
  const { slug } = useParams();

  const handleModal = () => {
    if (!user || !user.token) {
      history.push({
        pathname: "/login",
        state: { from: `https://bananauyu.up.railway.app/api/product/${slug}` },
      });
      return;
    }

    setModalVisible(true);
  };

  return (
    <>
      <div>
        <AiOutlineStar
          size={30}
          onClick={handleModal}
          className="text-danger"
        />
      </div>
      <Modal
        title="Leave your rating"
        centered
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review. It will apper soon");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
