'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ApartmentFilters } from '@/types/apartment';

interface ApartmentState {
  filters: ApartmentFilters;
  sortBy: 'title' | 'createdAt' | 'price' | 'sizeInSquareMeters' | 'numberOfRooms';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
}

type ApartmentAction =
  | { type: 'SET_FILTERS'; payload: Partial<ApartmentFilters> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_SORT'; payload: { sortBy: 'title' | 'createdAt' |'price' | 'sizeInSquareMeters' | 'numberOfRooms'; sortOrder: 'asc' | 'desc' } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'RESET_PAGE' };

const initialState: ApartmentState = {
  filters: {
    search: '',
    areaId: undefined,
    status: undefined,
    isFurnished: null,
    hasParking: null,
    minPrice: undefined,
    maxPrice: undefined,
    minRooms: undefined,
    minBathrooms: undefined,
  },
  sortBy: 'createdAt',
  sortOrder: 'desc',
  currentPage: 1
};

function apartmentReducer(state: ApartmentState, action: ApartmentAction): ApartmentState {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1 // Reset page when filters change
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
        currentPage: 1
      };
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
        currentPage: 1
      };
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    case 'RESET_PAGE':
      return {
        ...state,
        currentPage: 1
      };
    default:
      return state;
  }
}

const ApartmentContext = createContext<{
  state: ApartmentState;
  dispatch: React.Dispatch<ApartmentAction>;
} | null>(null);

export function ApartmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(apartmentReducer, initialState);

  return (
    <ApartmentContext.Provider value={{ state, dispatch }}>
      {children}
    </ApartmentContext.Provider>
  );
}

export function useApartmentContext() {
  const context = useContext(ApartmentContext);
  if (!context) {
    throw new Error('useApartmentContext must be used within an ApartmentProvider');
  }
  return context;
}