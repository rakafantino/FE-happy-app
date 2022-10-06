import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import CommunityNavbar from "../components/CommunityNavbar";
import { Footer } from "../components/Footer";
import HeaderCommunity from "../components/HeaderCommunity";
import ProductCard from "../components/ProductCard";
import "../styles/CommunityStore.css";

const CommunityStore = () => {
  const [showMember, setShowMember] = useState(false);
  const handleClose = () => setShowMember(false);
  const handleShow = () => setShowMember(true);

  const [communityStore, setCommunityStore] = useState([]);
  const [communityMembers, setCommunityMembers] = useState([]);
  const [communityDetails, setCommunityDetails] = useState({});

  useEffect(() => {
    getCommunityStore();
    getCommunityMembers();
  }, []);

  var axios = require("axios");

  const getCommunityStore = () => {
    axios
      .get(`https://tugas.website/community/${Cookies.get("id")}/store`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => {
        setCommunityStore(res.data.product);
        setCommunityDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCommunityMembers = () => {
    axios
      .get(`https://tugas.website/community/members/${Cookies.get("id")}`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => {
        setCommunityMembers(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <HeaderCommunity handleShow={handleShow} communityDetails={communityDetails} />
      <CommunityNavbar />
      <Container className="contcs min-vh-100">
        {communityStore ? (
          <>
            {communityStore.map((item) => {
              return (
                <div>
                  <ProductCard item={item} />;
                </div>
              );
            })}
          </>
        ) : (
          <div>
            <h5>no Items</h5>
          </div>
        )}
      </Container>
      <Footer />
      <Modal show={showMember} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>List Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {communityMembers.map((member) => {
            return <h5 className="text-capitalize">{member}</h5>;
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommunityStore;
