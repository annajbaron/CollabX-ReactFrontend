import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Pitch} from '../requests/pitches';
import {Vote} from '../requests/votes';


class PitchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand_1: "",
      brand_2: ""
    }
  }

  handleChange(event) {
    const newState = Object.assign({}, this.state, {
      [event.target.name]: event.target.value,
    });
    this.setState(newState);
  }

  componentDidMount() {
    Pitch
      .all()
      .then((res) => {
        this.props.getPitches(res);
      })
  }

  createPitch() {
    const {brand_1, brand_2} = this.state;
    Pitch
      .create({brand_1, brand_2})
      .then((res) => {
        this.props.addPitch(res);
      })
      const newState = Object.assign({}, this.state, {
        brand_1: "", brand_2: ""
      })
      this.setState(newState);
  }

  addVote(params) {
    Vote
      .create(params)
      .then((res) => {
        this.props.addVotedPitches(res);
      })
  }

  removeVote(voteId) {
    Vote
      .destroy(voteId)
      .then((res) => {
        this.props.removeVotedPitches(voteId);
      })
  }


  renderList() {
    const {votedPitches} = this.props;
    return this.props.pitches.map((pitch) => {
      let vote = votedPitches.filter(vote => vote.pitch_id === pitch.id)[0]
      return (
        <div
          key={pitch.id}
          className="pitch-sneak-peak"
          >
          <div>
            {pitch.brand_1} <img className="pitch-connector" src="https://s3.amazonaws.com/collab-x-pictures/favicon" /> {pitch.brand_2}
          </div>
          <div>
            {
              votedPitches.map(vote => vote.pitch_id).includes(pitch.id) ?
              <div>
                {
                  vote.is_up == true ?
                  [
                    <i className="material-icons" onClick={() => this.removeVote(vote.id)} color='#ff0000'>keyboard_arrow_up</i>,
                    <div>vote is up</div>,
                    <i className="material-icons" onClick={() => this.updateVote({id: vote.id, is_up: false})} color='#ff0000'>keyboard_arrow_down</i>
                  ]
                  :
                  [
                    <i className="material-icons" onClick={() => this.updateVote({id: vote.id, is_up: true})}>keyboard_arrow_up</i>,
                    <div>vote is down</div>,
                    <i className="material-icons" onClick={() => this.removeVote(vote.id)}>keyboard_arrow_down</i>
                  ]
                }
              </div>
              :
              [
                <i className="material-icons" onClick={() => this.addVote({pitch_id: pitch.id, is_up: true})}>keyboard_arrow_up</i>,
                <i className="material-icons" onClick={() => this.addVote({pitch_id: pitch.id, is_up: false})}>keyboard_arrow_down</i>
              ]

            }
          </div>
            <br />
            <hr />
        </div>
      )
    });
  }

  render() {
    const {pitches, votedPitches} = this.props;
    return(
      <div className="page">
        <h1 className="page-header">PITCH a COLLAB</h1>
        <div className="pitch-content">
          <div className="pitch-list">
            {this.renderList()}
          </div>
          <div>
            <img className="pitch-picture" src="https://s3.amazonaws.com/collab-x-pictures/virgilnike" />
          </div>
        </div>
        <form>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control collab-input"
                name="brand_1"
                placeholder="BRAND 1"
                onInput={this.handleChange.bind(this)}
                value={this.state.brand_1}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control collab-input"
                name="brand_2"
                onInput={this.handleChange.bind(this)}
                value={this.state.brand_2}
                placeholder="BRAND 2"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <button
                type="button"
                className="center-block btn-sign"
                onClick={()=>this.createPitch()}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pitches: state.pitches,
    votedPitches: state.votedPitches
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPitches: pitches => dispatch(actions.getPitches(pitches)),
    addPitch: pitch => dispatch(actions.addPitch(pitch)),
    addVotedPitches: vote => dispatch(actions.addVotedPitches(vote)),
    removeVotedPitches: vote => dispatch(actions.removeVotedPitches(vote))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PitchPage);
