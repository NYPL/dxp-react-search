import React from "react";
import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
import { render } from "./../../../../testHelper/customRtlRender";
import LocationHours from "./LocationHours";

expect.extend(toHaveNoViolations);

describe("LocationHours Component", () => {
  test("location should be open with regular hours.", () => {
    render(
      <LocationHours
        open={true}
        todayHoursStart={"11:00"}
        todayHoursEnd={"12:00"}
      />
    );

    expect(screen.getByText("Today's Hours:")).toBeInTheDocument();
    expect(screen.getByText("11AM–12PM")).toBeInTheDocument();
  });

  test("location should be open with regular hours that include start mins", () => {
    render(
      <LocationHours
        open={true}
        todayHoursStart={"11:19"}
        todayHoursEnd={"12:00"}
      />
    );

    expect(screen.getByText("Today's Hours:")).toBeInTheDocument();
    expect(screen.getByText("11:19AM–12PM")).toBeInTheDocument();
  });

  test("location should be open with regular hours that include end mins", () => {
    render(
      <LocationHours
        open={true}
        todayHoursStart={"11:00"}
        todayHoursEnd={"12:57"}
      />
    );

    expect(screen.getByText("Today's Hours:")).toBeInTheDocument();
    expect(screen.getByText("11AM–12:57PM")).toBeInTheDocument();
  });

  test("location should be open with regular hours that include start and end mins", () => {
    render(
      <LocationHours
        open={true}
        todayHoursStart={"10:08"}
        todayHoursEnd={"17:57"}
      />
    );

    expect(screen.getByText("Today's Hours:")).toBeInTheDocument();
    expect(screen.getByText("10:08AM–5:57PM")).toBeInTheDocument();
  });

  test("location should be closed due to regular hours", () => {
    render(
      <LocationHours open={true} todayHoursStart={null} todayHoursEnd={null} />
    );

    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  test("location with regular hours should be temporarily closed due to extended closing or alert closing.", () => {
    render(
      <LocationHours
        open={false}
        todayHoursStart={"11:00"}
        todayHoursEnd={"12:00"}
      />
    );

    expect(
      screen.getByText("Location is temporarily closed")
    ).toBeInTheDocument();
  });

  test("location without regular hours should be temporarily closed due to extended closing or alert closing. ", () => {
    render(
      <LocationHours open={false} todayHoursStart={null} todayHoursEnd={null} />
    );

    expect(
      screen.getByText("Location is temporarily closed")
    ).toBeInTheDocument();
  });

  test("location with null for start hours only should be closed due to regular hours", () => {
    render(
      <LocationHours
        open={true}
        todayHoursStart={null}
        todayHoursEnd={"12:00"}
      />
    );

    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  test("location with null for end hours only should be closed due to regular hours", () => {
    render(
      <LocationHours
        open={true}
        todayHoursStart={"11:15"}
        todayHoursEnd={null}
      />
    );

    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  test("Location with regular hours and by appointment only should render hours notice.", () => {
    render(
      <LocationHours
        open={true}
        todayHoursStart={"11:15"}
        todayHoursEnd={"14:01"}
        appointmentOnly={true}
      />
    );

    expect(
      screen.getByText("* Division is by appointment only.")
    ).toBeInTheDocument();
    expect(screen.getByText("Today's Hours:")).toBeInTheDocument();
    expect(screen.getByText("11:15AM–2:01PM*")).toBeInTheDocument();
  });

  test("Location with regular hours, but not by appointment only should not render hours notice.", () => {
    render(
      <LocationHours
        open={true}
        todayHoursStart={"11:15"}
        todayHoursEnd={"14:00"}
        appointmentOnly={false}
      />
    );

    expect(
      screen.queryByText("* Division is by appointment only.")
    ).not.toBeInTheDocument();
    expect(screen.getByText("Today's Hours:")).toBeInTheDocument();
    expect(screen.getByText("11:15AM–2PM")).toBeInTheDocument();
  });

  // Accessbiility tests.
  it("should not have basic accessibility issues", async () => {
    const { container } = render(
      <LocationHours
        open={true}
        todayHoursStart={"11:00"}
        todayHoursEnd={"18:00"}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
