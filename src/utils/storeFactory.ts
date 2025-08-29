import type { AxiosError } from "axios";
import type { Event } from "effector";
import { createEffect,createEvent, createStore } from "effector";
import { useUnit } from "effector-react";

type Reducer<State, Payload> = (state: State, payload: Payload) => State | void;

export const storeFactory = <State>(initValue: State) => {
  const $currentStore = createStore<State>(initValue);

  const subscribeTriggerOnStore = <Payload>(
    event: Event<Payload>,
    reducer: Reducer<State, Payload>,
  ) => {
    $currentStore.on(event, reducer);
  };
  
  const createStoreEvent = <Payload = State>(
    reducer: Reducer<State, Payload>,
  ) => {
    const event = createEvent<Payload>();
    subscribeTriggerOnStore(event, reducer);
    return event;
  };

  const useMiddleWare = <Params = void>(
    handler: (params: Params) => Promise<State>
  ) => {
    const effect = createEffect<Params, State, AxiosError>(handler);
    subscribeTriggerOnStore(effect.doneData, (_, payload) => payload);
    return useUnit(effect);
  }

  const changeEvent = createStoreEvent<Partial<State>>((oldState, payload) => {
    if (payload !== Object(payload)) {
      return payload as State
    }

    return ({
      ...oldState,
      ...payload,
    })
  });

  const setEvent = createStoreEvent<State>((_, payload) => payload);

  return {
    useStore: () => useUnit([$currentStore, changeEvent]),
    useMiddleWare,
    dispatchEvent,
    changeEvent,
    setEvent,
  };
};
