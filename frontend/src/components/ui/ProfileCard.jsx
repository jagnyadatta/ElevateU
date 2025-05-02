import React from "react";
import styled from "styled-components";
import { Button } from "./button";

const ProfileCard = ({ name, image, college }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="w-full h-52 overflow-hidden rounded-lg">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <p className="card-title">{name}</p>
        <p className="card-body">{college}</p>
        <Button className="bg-[#3b66ff]">Go With</Button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    padding: 20px;
    width: 250px;
    min-height: 370px;
    border-radius: 20px;
    background: #e8e8e8;
    box-shadow: 5px 5px 6px #dadada, -5px -5px 6px #f6f6f6;
    transition: 0.4s;
  }

  .card:hover {
    translate: 0 -10px;
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: #2e54a7;
    margin: 15px 0 0 10px;
  }

  .card-image {
    min-height: 170px;
    background-color: #c9c9c9;
    border-radius: 15px;
    box-shadow: inset 8px 8px 10px #c3c3c3, inset -8px -8px 10px #cfcfcf;
  }

  .card-body {
    margin: 13px 0 0 10px;
    color: rgb(31, 31, 31);
    font-size: 15px;
  }

  .footer {
    float: right;
    margin: 28px 0 0 18px;
    font-size: 13px;
    color: #636363;
  }

  .by-name {
    font-weight: 700;
  }
`;

export default ProfileCard;