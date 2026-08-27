import { expect } from "chai";
import { mount } from "@vue/test-utils";
import MHome from "@/components/m-home.vue";

describe("m-home.vue", () => {
  it("renders the heading and description", () => {
    const wrapper = mount(MHome);

    expect(wrapper.find("h1").text()).to.equal("JSON to Resume");
    expect(wrapper.find("p").text()).to.equal("这是一个便捷的 JSON 转简历工具。");
  });
});
