import { AppState } from './app-state';
import { Action } from './action';
import { ActionType } from './action-type';

// The store calls the reducer, sends it the current AppState,
// the reducer creates a new AppState with the desired change
// and returns the new AppState without touching the given AppState

export function reducer(currentState: AppState, action: Action): AppState {

    const newState = { ...currentState }; // Spread Operator

    switch (action.type) {

        case ActionType.GetAllAuctions:
            newState.auctions = action.payload; // payload = all
            break;

        case ActionType.GetOneAuction:
            newState.auctions.push(action.payload); // payload = one
            break;

        case ActionType.AddAuction:
            newState.auctions.push(action.payload); // payload =  to add
            break;

        case ActionType.UpdateAuction: {
            const index = newState.auctions.findIndex(a => a._id === action.payload._id); // payload =  to update
            newState.auctions[index] = action.payload;
            break;
        }

        case ActionType.DeleteAuction: {
            const index = newState.auctions.findIndex(a => a._id === action.payload); // payload = _id to delete
            newState.auctions.splice(index, 1);
            break;
        }
    }

    return newState;
}
