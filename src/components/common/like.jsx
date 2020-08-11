import React, { Component } from "react";

class Like extends Component {
  render() {
    return (
      <div className="like-container" onClick={this.props.onLiked}>
        <i className={this.props.liked ? "fa fa-heart" : "fa fa-heart-o"}></i>
      </div>
    );
  }
}

export default Like;
