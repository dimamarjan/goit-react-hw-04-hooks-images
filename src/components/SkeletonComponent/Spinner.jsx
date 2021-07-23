import Loader from "react-loader-spinner";
import React, { Component } from 'react'

import { SpinnerContainer } from 'components/SkeletonComponent/Spinner.style'

export class Spinner extends Component {

  render() {
      return (
        <SpinnerContainer>
            <Loader
                type="Puff"
                color="#3f51b5"
                height={100}
                width={100}
            />
        </SpinnerContainer>
    );
  }
}