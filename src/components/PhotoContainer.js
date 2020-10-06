import React, { Component } from 'react';
import Photo from './Photo';
import PhotoNotFound from './PhotoNotFound';


class PhotoContainer extends Component {

    
    render() {
        const query = this.props.question;
        const results = this.props.data;
        let pics;
        if (results.length > 0) {
            pics = results.map(pic => 
                <Photo url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`} key={pic.id}/>
            );
        } else if (results.length <= 0 && this.props.loading) {
            pics = <h2>Loading...</h2>;
        } else {
            pics = <PhotoNotFound />;
            return (
                <ul>
                {pics}
                </ul>
                );
        }

        return(
            <div className="photo-container">
                <h2>{query} Pics</h2>
                <ul>
                    {pics}
                </ul>    
            </div>    
        );
    }

}

export default PhotoContainer;