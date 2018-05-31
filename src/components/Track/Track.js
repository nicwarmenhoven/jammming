import React from 'react';
import './Track.css';
// TODO import:

class Track extends React.Component {

  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <a className="Track-action">-</a>;
    } else {
      return <a className="Track-action" onClick={this.addTrack()}>+</a>;
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          {/* {console.log(this.props.onAdd)} */}
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  };
};
export default Track;