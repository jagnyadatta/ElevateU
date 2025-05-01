import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const ProfileButton = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <span className="button-decor" />
        <div className="button-content">
          <div className="button__icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path fill="#74C0FC" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>          </div>
          <span className="button__text">Profile</span>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    text-decoration: none;
    line-height: 1;
    border-radius: 1.5rem;
    overflow: hidden;
    position: relative;
    box-shadow: 10px 10px 20px rgba(0,0,0,.05);
    background-color: #fff;
    color: #121212;
    border: none;
    cursor: pointer;
  }

  .button-decor {
    position: absolute;
    inset: 0;
    background-color: #3b66ff;
    transform: translateX(-100%);
    transition: transform .3s;
    z-index: 0;
  }

  .button-content {
    display: flex;
    align-items: center;
    font-weight: 600;
    position: relative;
    overflow: hidden;
  }

  .button__icon {
    width: 48px;
    height: 40px;
    background-color: #3b66ff;
    display: grid;
    place-items: center;
  }

  .button__text {
    display: inline-block;
    transition: color .2s;
    padding: 2px 1.5rem 2px;
    padding-left: .75rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 150px;
  }

  .button:hover .button__text {
    color: #fff;
  }

  .button:hover .button-decor {
    transform: translate(0);
  }`;

export default ProfileButton;
