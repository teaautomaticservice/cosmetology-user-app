import type { AxiosError } from "axios";
import type { Event, EventCallable } from "effector";
import { createEffect,createEvent, createStore } from "effector";
import { useUnit } from "effector-react";

type Reducer<State, Payload> = (state: State, payload: Payload) => State | void;

export const storeFactory = <State>(initValue: State) => {
  const $currentStore = createStore<State>(initValue);

  const subscribeTriggerOnStore = <Payload>(event: Event<Payload>, reducer: Reducer<State, Payload>) => {
    $currentStore.on(event, reducer);
  };
  
  const createStoreEvent = <Payload = State>(reducer: Reducer<State, Payload>) => {
    const event = createEvent<Payload>();
    subscribeTriggerOnStore(event, reducer);
    return event;
  };

  const useCreateEffect = <Params>(handler: Function) => {
    const effect = createEffect<Params, State, AxiosError>(handler);
    subscribeTriggerOnStore(effect.doneData, (_, payload) => payload);
    return useUnit(effect);
  };

  const changeEvent = createStoreEvent<State>((_, payload) => payload);

  return {
    useStore: () => useUnit([$currentStore, changeEvent]),
    useCreateEffect,
    createStoreEvent,
    useEvent: <Payload = State>(event: EventCallable<Payload>) => useUnit(event),
    useChangeEvent: <Payload = State>(reducer: Reducer<State, Payload>) => useUnit(createStoreEvent(reducer)),
    useNewEvent: (reducer: Reducer<State, State>) => useUnit(createStoreEvent(reducer)),
  };
};
