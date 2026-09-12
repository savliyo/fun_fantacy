const isFunction = (fn: any) => typeof fn === 'function';
export type Nullable<T> = T | null | undefined;

export interface SubscriptionLike {
  unsubscribe(): void;
}

/**
 * Subscription sink that holds Observable subscriptions
 * until you call unsubscribe on it in ngOnDestroy.
 */
export class SubSink {
  protected subs: Nullable<SubscriptionLike>[] = [];

  /**
   * Assign subscription to this sink to add it to the tracked subscriptions
   * @example
   *  this.subs.merge = observable$.subscribe(...);
   */
  set sink(subscription: Nullable<SubscriptionLike>) {
    this.subs.push(subscription);
  }

  /**
   * Unsubscribe to all subscriptions in ngOnDestroy()
   * @example
   *   ngOnDestroy() {
   *     this.subs.unsubscribe();
   *   }
   */
  unsubscribe() {
    this.subs.forEach(
      (sub) => sub && isFunction(sub.unsubscribe) && sub.unsubscribe()
    );
    this.subs = [];
  }
}
