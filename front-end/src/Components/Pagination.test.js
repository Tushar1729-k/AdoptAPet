import React from 'react';
import Paginate from "./Pagination";
import renderer from 'react-test-renderer';

const paginate = (num) => {
    return
}

test("Number of Pages Properly Rendered", () => {
    const component = renderer.create(
        <Paginate totalItems={600} itemsPerPage={100} paginate={paginate}/>,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})
