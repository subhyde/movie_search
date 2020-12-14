import React from "react";
import {Panel, Button} from "rsuite";
import 'rsuite/dist/styles/rsuite-default.css';

interface MoviesProps {
    id: string,
    title: string,
    img: string,
    description: string
    vote: number
}

class MovieRow extends React.Component<MoviesProps>{
    render(){
        return(
            <div key={this.props.id} style={{position:'relative'}}>
                <Panel header={<h1 style={{textAlign:'left'}}>{this.props.title} <span style={{float:"right"}}>{this.props.vote}/10</span></h1>} shaded>

                    <img src={this.props.img} width={140} alt={'logo'}
                         style={{
                             float: 'left',
                             marginRight: '2em'
                         }}/>
                         <h3
                        style={{
                            textAlign: 'left',
                            marginLeft: '150px'}}>{this.props.description}</h3>
                    <Button size={'lg'} appearance="primary" href={'https://www.themoviedb.org/movie/' + this.props.id}
                    style={{
                        position:'absolute',
                        right: 20,
                        bottom: 20
                    }}>More Info</Button>
                </Panel>
            </div>
        )
    }

}

export default MovieRow;
