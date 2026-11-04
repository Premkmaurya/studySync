/**
 * Decoupled Toast Dispatcher
 * Dispatches a custom window event to trigger toast notifications
 * without creating circular dependencies with the Redux store.
 */

export const dispatchToast = (toast) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("studysync:toast", {
        detail: toast,
      })
    );
  }
};
