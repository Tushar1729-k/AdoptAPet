import React from 'react';
import YoutubePlayer from "./Youtube";
import renderer from 'react-test-renderer';

test("Youtube video properly rendered", () => {
    const component = renderer.create(
        <YoutubePlayer searchQuery={"Domestic Short Hair"} />,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})