import { Constructor } from './types'

//========================================================================
//
//  Interfaces
//
//========================================================================

//
// このミックスインは下記URLを参考にして実装:
// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
//

type Mixin<BASE, RESULT> = (superclass: Constructor<BASE>) => Constructor<RESULT>

//========================================================================
//
//  Implementation
//
//========================================================================

function mix<T>(superclass: Constructor<T>): MixinBuilder<T> {
  return new MixinBuilder<T>(superclass)
}

class MixinBuilder<T> {
  constructor(superclass: Constructor<T>) {
    this.superclass = superclass
  }

  superclass: Constructor<T>

  with<A>(MixinA: Mixin<T, A>): Constructor<T> & Constructor<A>
  with<A, B>(MixinA: Mixin<T, A>, MixinB: Mixin<T, B>): Constructor<T> & Constructor<A> & Constructor<B>
  with<A, B, C>(MixinA: Mixin<T, A>, MixinB: Mixin<T, B>, MixinC: Mixin<T, C>): Constructor<T> & Constructor<A> & Constructor<B> & Constructor<C>
  with<A, B, C, D>(
    MixinA: Mixin<T, A>,
    MixinB: Mixin<T, B>,
    MixinC: Mixin<T, C>,
    MixinD: Mixin<T, D>
  ): Constructor<T> & Constructor<A> & Constructor<B> & Constructor<C> & Constructor<D>
  with<A, B, C, D, E>(
    MixinA: Mixin<T, A>,
    MixinB: Mixin<T, B>,
    MixinC: Mixin<T, C>,
    MixinD: Mixin<T, D>,
    MixinE: Mixin<T, E>
  ): Constructor<T> & Constructor<A> & Constructor<B> & Constructor<C> & Constructor<D> & Constructor<E>
  with(...mixins: any[]) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass)
  }
}

//========================================================================
//
//  Exports
//
//========================================================================

export { Mixin, MixinBuilder, mix }
