import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

//configure enzyme to use the adapter you want it to use
configure({ adapter: new Adapter() });

describe("<NavigationItems", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should load only 2 Navigation items if user is not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should load 3 Navigation items if user is authenticated", () => {
    // const wrapper = shallow(<NavigationItems isAuthenticated/>)
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should load Signout if user is authenticated", () => {
    // const wrapper = shallow(<NavigationItems isAuthenticated/>)
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(
        <NavigationItem linkAddress="/signout">Sign out</NavigationItem>
      )
    ).toEqual(true);
  });
});
