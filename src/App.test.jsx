import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';


describe('App tests', () => {
  test("App should render", () => {
    render(<App />);
    expect(screen.getByText('Choose a user:')).toBeDefined();
  });

  test('Name should change after selecting from menu', () => {
    render(<App />);
    const continueButton = screen.getByTestId('continue-button');
    fireEvent.click(continueButton);

    const menu = screen.getByTestId('athelete-menu');
    expect(menu.textContent).toContain('Kevin');
    fireEvent.click(menu);

    const menuItem = screen.getByTestId('athelete-menu-item-Josh');
    fireEvent.click(menuItem);

    expect(menu.textContent).toContain('Josh');
    expect(menu.textContent).not.toContain('Kevin');
  });
});