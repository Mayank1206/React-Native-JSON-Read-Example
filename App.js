import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    Image,
    ListView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ImageSlider from 'react-native-image-slider';

import Swiper from 'react-native-swiper';

import { 
    Constants 
} from 'expo';

var Dimensions = require('Dimensions');
var window = Dimensions.get('window');


export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            MoviesList: "Hello",
            Demo: "fgdfkj",
            dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                  }),
        }
    }

    componentDidMount() {
        return fetch('https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    MoviesList: responseJson.total,
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.movies)
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content'/>
                <View style={styles.ratingExpAud}>
                    <Text> Total Movies - {this.state.MoviesList}</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovie}
                    style={styles.listView}
                />
            </View>
        );
    }

    renderMovie(movie) {
      return (
        <View style={styles.rendermovie}>
            <View style={styles.ratingExpAud}>
                <Text>Title : {movie.title}</Text>
                <Text>On Screen : {movie.year}</Text>
            </View>
            <Image
                source={{uri: movie.posters.thumbnail}}
                style={styles.thumbnail}
            />
            <ImageSlider images={[
                    movie.posters.thumbnail,
                    movie.posters.profile,
                    movie.posters.detailed,
                    movie.posters.original
                ]}
                height={250}
            />            
            <View style={styles.ratingExpAud}>
                <Text>*** Ratings ***</Text>
                <View style={styles.ratingExpAudUpd}>
                    <Text style={styles.ratingAlign}>Expert Rating : {movie.ratings.critics_score}</Text>
                    <Text>Audience Rating : {movie.ratings.audience_score}</Text>
                </View>
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
    },
    listView: {
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
        width: window.width,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    rendermovie: {
        paddingTop:20,
    },
    ratingExpAud: {
        width: window.width,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    ratingExpAudUpd: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    ratingAlign: {
        width: window.width/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
