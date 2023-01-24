

import { expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import "jest";
import { Provider } from 'react-redux';
import { LaboratoryView } from '../../../src/pharmacy/views/LaboratoryView';
import { inventoryApi } from '../../../src/store/apis/invetoryApi';
import { laboratoryApi, useGetLaboratoriesQuery } from '../../../src/store/apis/laboratoryApi';
import { laboratorySlice } from '../../../src/store/laboratory/laboratorySlice';
// jest.mock("../../../src/store/apis/laboratoryApi")
const mockUseGetLaboratoriesQuery = jest.fn()

const store = configureStore({
  reducer :{
    laboratoryStore : laboratorySlice.reducer,
    [inventoryApi.reducerPath] : inventoryApi.reducer,
    [laboratoryApi.reducerPath] : laboratoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(inventoryApi.middleware).concat(laboratoryApi.middleware)
})

const laboratories = [
  {
    "id": "abc16638-f775-4ceb-a40d-0b889666b9c2",
    "createdAt": "2022-07-24T11:54:56.632Z",
    "updatedAt": "2022-07-24T11:54:56.632Z",
    "address": "Lima Peru",
    "description": "Laboratorio Muerte description",
    "name": "Laboratorio Muerte",
    "lng": "-73.990593",
    "lat": "40.740121"
  },
  {
    "id": "b003453e-0fb7-11ed-91ed-e0d55eb315bd",
    "createdAt": "2022-07-30T13:27:36.000Z",
    "updatedAt": "2022-07-30T13:27:36.000Z",
    "address": "Argentina, Buenos Aires",
    "description": "Laboratorio en Argentina",
    "name": "ArgentinaLab",
    "lng": "-77.02053535953974",
    "lat": "-11.942631145218613"
  }
];

jest.mock("../../../src/store/apis/laboratoryApi.ts",()=>({
  ...jest.requireActual("../../../src/store/apis/laboratoryApi.ts"),
  useGetLaboratoriesQuery : () => mockUseGetLaboratoriesQuery()
}))

describe('Testing al componente de <LaboratoryView />', () => {
  beforeEach(() => jest.clearAllMocks());
  test('Deberia hacer match con el snapshot', () => {
    mockUseGetLaboratoriesQuery.mockReturnValue({
      refetch: jest.fn(),
      isLoading : false,
      data :{
        data : laboratories
      }
    })
    const { container } = render(
      <Provider store={store}>
        <LaboratoryView />
      </Provider> 
    )
    expect(container).toMatchSnapshot();
  })
  test('Deberia renderizar la tabla de los laboratorios', () => {
    mockUseGetLaboratoriesQuery.mockReturnValue({
      refetch: jest.fn(),
      isLoading : false,
      data :{
        data : laboratories
      }
    })
    render(
      <Provider store={store}>
        <LaboratoryView />
      </Provider> 
    )
    expect( screen.getAllByText('Laboratorios').length ).toBeGreaterThanOrEqual(1);
    expect( screen.getByText('Laboratorio Muerte description') ).toBeTruthy()
    expect( screen.getByText('Laboratorio en Argentina') ).toBeTruthy()
    expect( screen.getByLabelText('tabla-laboratorios') ).toBeTruthy()
  })
})