/**
 * Created by Mosquitodawg on 3/10/2017.
 */

describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(false);
  });
});
