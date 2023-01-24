import { expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import "jest";
import { Provider } from 'react-redux';
import { InventoryView } from '../../../src/pharmacy/views/InventoryView';
import { inventoryApi } from '../../../src/store/apis/invetoryApi';
import { productSlice } from '../../../src/store/inventory/inventorySlice';
import { products } from '../../fixtures/homeFixtures';

const mockUseGetProductsQuery = jest.fn()

const store = configureStore({

  reducer :{
    product : productSlice.reducer,
    [inventoryApi.reducerPath] : inventoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(inventoryApi.middleware)
})

jest.mock("../../../src/store/apis/invetoryApi",()=>({
  ...jest.requireActual("../../../src/store/apis/invetoryApi"),
  useGetProductsQuery : () => mockUseGetProductsQuery()
}))
describe('Testing al componente de <InventoryView />', () => {
  beforeEach(() => jest.clearAllMocks());
  test('Deberia hacer match con el snapshot', () => {
    mockUseGetProductsQuery.mockReturnValue({
      refetch: jest.fn(),
      isLoading : false,
      data :{
        data : products
      }
    })
    const { container } = render(
      <Provider store={store}>
        <InventoryView />
      </Provider> 
    )
    expect(container).toMatchSnapshot();
  })
  test('Deberera de renderizar la tabla de productos correctamente', () => {
    mockUseGetProductsQuery.mockReturnValue({
      refetch: jest.fn(),
      isLoading : false,
      data :{
        data : products
      }
    })
    render(
      <Provider store={store}>
        <InventoryView />
      </Provider> 
    )
    expect( screen.getByText('Inventario de Productos') ).toBeTruthy()
    expect( screen.getByLabelText('tabla-productos') ).toBeTruthy()
    expect( screen.getByText('Vendas') ).toBeTruthy()
    expect( screen.getByText('Para Heridas') ).toBeTruthy()
  })
})