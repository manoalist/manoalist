import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';

class AboutUs extends React.Component {

  render() {
    const pageStyle = { paddingTop: '1em' };
    const gridStyle = { paddingTop: '5px', paddingBottom: '5em' };

    return (
        <div style={pageStyle}>
          <Image fluid src={'/images/meet.png'}/>
          <Header style={pageStyle} textAlign={'center'} as={'h2'}>
            Five ICS students at the University of Hawaii at Manoa
          </Header>
          <Grid style={gridStyle} container stackable columns={5}>
            <Grid.Column>
              <a href={'https://craigopie.github.io/'}>
                <Segment padded inverted>
                  <Image circular centered size={'small'} src={'/images/craig.jpg'}/>
                  <Header textAlign={'center'}>CRAIG OPIE</Header>
                  <p>
                    Been programming as a hobby for 21 years. An experienced project manager.
                    Loves hiking, learning, and family.
                  </p>
                </Segment>
              </a>
            </Grid.Column>
            <Grid.Column>
              <a href={'https://heweiron.github.io/'}>
                <Segment padded raised inverted>
                  <Image circular centered size={'small'} src={'/images/weirong.jpg'}/>
                  <Header textAlign={'center'}>WEIRONG HE</Header>
                  <p>
                    First experience with building a website. Used learned skils to contribute.
                    Likes eating and video games.
                  </p>
                </Segment>
              </a>
            </Grid.Column>
            <Grid.Column>
              <a href={'https://tianhuizhou.github.io/'}>
                <Segment padded inverted>
                  <Image circular centered size={'small'} src={'/images/tianhui.jpg'}/>
                  <Header textAlign={'center'}>TIANHUI ZHOU</Header>
                  <p>
                    New to building a site. Applied what I&apos;ve learned to various issues.
                    Likes basketball and video games.
                  </p>
                </Segment>
              </a>
            </Grid.Column>
            <Grid.Column>
              <a href={'https://edwin-zheng.github.io/'}>
                <Segment padded inverted>
                  <Image circular centered size={'small'} src={'/images/edwin.jpg'}/>
                  <Header textAlign={'center'}>EDWIN ZHENG</Header>
                  <p>
                    Front end developer for almost 2 years using Javascript, HTML, CSS, AngularJS, and React. Likes
                    gaming and reading.
                  </p>
                </Segment>
              </a>
            </Grid.Column>
            <Grid.Column>
              <a href={'https://kyraikeda.github.io/'}>
                <Segment padded inverted>
                  <Image circular centered size={'small'} src={'/images/kyra.jpg'}/>
                  <Header textAlign={'center'}>KYRA IKEDA</Header>
                  <p>
                    New to software engineering. Used what I’ve learned and applied them to this project.
                    Loves surfing and drawing.
                  </p>
                </Segment>
              </a>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

AboutUs.propTypes = {
  location: PropTypes.object,
};

export default AboutUs;
