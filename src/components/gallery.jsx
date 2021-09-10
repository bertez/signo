import React, { Component } from "react";

// import Carousel, { Modal, ModalGateway } from "react-images";

export class Gallery extends Component {
  // state = {
  //   selectedIndex: 0,
  //   lightBoxIsOpen: false,
  // };

  // toggleLightBox = (selectedIndex) => {
  //   this.setState({
  //     lightBoxIsOpen: !this.state.lightBoxIsOpen,
  //     selectedIndex,
  //   });
  // };

  render = () => {
    const { images } = this.props;

    const imageList = images.map((i) => {
      return {
        caption: i.title,
        source: {
          thumbnail: i.image.childImageSharp.thumb.src,
          regular: i.image.childImageSharp.big.src,
        },
      };
    });

    // const { selectedIndex, lightBoxIsOpen } = this.state;

    return (
      <>
        <ul className="ly-gallery">
          {imageList.map((i, j) => (
            <li key={i.source.thumbnail}>
              <a
                href={i.source.regular}
                onClick={(e) => {
                  e.preventDefault();
                  // this.toggleLightBox(j);
                }}
              >
                <img src={i.source.thumbnail} alt={i.title} />
              </a>
            </li>
          ))}
        </ul>
      </>
    );
  };
}
