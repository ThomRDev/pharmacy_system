import { expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import "jest";
import { HomeView } from '../../../src/pharmacy/views/HomeView';
import { mostSelled, products } from '../../fixtures/homeFixtures';

const mockGetAllProducts = jest.fn();
const mockGetMostSelledProducts = jest.fn();


jest.mock("../../../src/pharmacy/helpers/product",()=>({
  getMostSelledProducts : () => mockGetMostSelledProducts(),
  getAllProducts : () => mockGetAllProducts()
}))

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

describe('Testing al componente de <HomeView />', () => {
  test('Deberia renderizar hacer match como el snapshot', async () => {
    mockGetMostSelledProducts.mockResolvedValue({
      data : mostSelled
    })
    mockGetAllProducts.mockResolvedValue({
      data : products
    })
    const { container } = render(
        <HomeView />
    )
    await waitFor(() =>{
      expect(container).toMatchSnapshot();
    })
  })
  test('Deberia renderizar el canvas para el grafico de los productos mas vendidos', async () => {
    mockGetMostSelledProducts.mockResolvedValue({
      data : mostSelled
    })
    mockGetAllProducts.mockResolvedValue({
      data : products
    })
    render(
      <HomeView />
    )
    await waitFor(() =>{
      expect(screen.getByText('Productos mas vendidos')).toBeTruthy()
    })
    await waitFor(() =>{
      expect(screen.getByLabelText('canvas-mas-vendido')).toBeTruthy()
    })
  })
  test('Deberia renderizar el canvas para el grafico de todos los productos registrados', async () => {
    mockGetMostSelledProducts.mockResolvedValue({
      data : mostSelled
    })
    mockGetAllProducts.mockResolvedValue({
      data : products
    })
    render(
      <HomeView />
    )
    await waitFor(() =>{
      expect(screen.getByText('Productos Registrados')).toBeTruthy()
    })
    await waitFor(() =>{
      expect(screen.getByLabelText('canvas-registrados')).toBeTruthy()
    })
  })
})