import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class Terms extends React.Component {
  render() {
    return (
        <div style={{ paddingTop: '20px', paddingBottom: '60px' }}>
          <Image centered size='tiny' src={'/images/manoalist-circle.png'} style={{ paddingBottom: '20px' }}/>
          <Container style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <Header as="h1" textAlign="center">Manoalist User Terms of Use</Header>
            <Header as="h3" textAlign="left">Terms of Use (&quot;Terms&quot;)</Header>
            <Header as="h4" textAlign="left" style={{ marginTop: '-10px' }}>Last updated: (April 16th, 2020)</Header>
            <p style={{ marginTop: '0px' }}>
              Please read these Terms of Use (&quot;Terms&quot;, &quot;Terms of Use&quot;) carefully before using the
              http://manoalist.meteorapp.com website (the &quot;Service&quot;)
              operated by UH Manoa (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
            </p>
            <p style={{ marginTop: '0px' }}>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these
              Terms.
              These terms apply to all visitors, users and others who access or use the Service.
            </p>
            <p style={{ marginTop: '0px' }}>
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of
              the
              terms then you may not access the Service.
            </p>
            <Header as="h3" textAlign="left">Termination</Header>
            <p style={{ marginTop: '-10px' }}>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any
              reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p style={{ marginTop: '0px' }}>
              All provisions of the Terms which by their nature should survive termination shall survive termination,
              including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of
              liability.
            </p>
            <Header as="h3" textAlign="left">Content</Header>
            <p style={{ marginTop: '-10px' }}>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text,
              graphics, or other material (&quot;Content&quot;).
            </p>
          </Container>
        </div>
    );
  }
}

export default Terms;
