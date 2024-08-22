// PowerBIEmbed.js
import React, { useEffect, useRef } from 'react';
import * as powerbi from 'powerbi-client';

const PowerBIEmbed = ({ embedUrl, token }) => {
  const embedContainer = useRef(null);

  useEffect(() => {
    if (embedContainer.current) {
      const models = powerbi.models;
      const config = {
        type: 'report',
        tokenType: models.TokenType.Embed,
        accessToken: token,
        embedUrl: embedUrl,
        id: '370b45df-2e31-42bf-a9e0-41159cdc9b0b', // Make sure this is the correct report ID
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
        },
      };

      // Embed the report and display it within the div container
      const report = powerbi.powerbi.embed(embedContainer.current, config);

      // Event handlers (optional)
      report.on('loaded', () => {
        console.log('Report loaded');
      });

      report.on('error', (event) => {
        console.error(event.detail);
      });

      return () => {
        powerbi.powerbi.reset(embedContainer.current);
      };
    }
  }, [embedUrl, token]);

  return <div ref={embedContainer} style={{ height: '500px' }} />;
};

export default PowerBIEmbed;
