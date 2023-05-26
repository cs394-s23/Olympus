import {describe, expect, test} from 'vitest';

describe('Date utils tests', () => {
  test("App should render", () => {
    render(<App />);
    expect(screen.getByText('Workout Volume Dashboard')).toBeDefined();
    expect(screen.getByText('1 Rep Max Dashboard')).toBeDefined();
  });
})
