import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Pitch} from '../requests/pitches';


class PitchPage extends Component {
  componentDidMount() {
    Pitch
      .all()
      .then((res) => {
        this.props.getPitches(res);
      })
  }

  renderList() {
    return this.props.pitches.map((pitch) => {
      return (
        <div
          key={pitch.id}
          className="pitch-sneak-peak"
          >
            {pitch.brand_1} X {pitch.brand_2}
            <br />
            <hr />
        </div>
      );
    });
  }

  render() {
    const {pitches} = this.props;
    return(
      <div className="page">
        <h1 className="page-header">PITCH a COLLAB</h1>
        <div className="pitch-list">
          <hr />
          {this.renderList()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pitches: state.pitches
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPitches: pitches => dispatch(actions.getPitches(pitches))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PitchPage);
