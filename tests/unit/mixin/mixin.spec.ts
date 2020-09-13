import { Constructor, mix } from '../../../src'

//========================================================================
//
//  Mock
//
//========================================================================

class BaseClass {
  constructor(msg1: string, msg2: string) {
    this.m_msg = `${msg1} ${msg2} from BaseClass`
  }

  private m_msg: string

  hello(): string {
    return this.m_msg
  }
}

interface Boo {
  boo(): string
}

interface Foo {
  foo(): string
}

interface Woo {
  woo(): string
}

export function BooMixin(superclass: Constructor<BaseClass>): Constructor<Boo> {
  return class extends superclass implements Boo {
    boo(): string {
      return 'boo from BooMixin'
    }
  }
}

export function FooAndWooMixin(superclass: Constructor<BaseClass>): Constructor<Foo & Woo> {
  return class extends superclass implements Foo, Woo {
    foo(): string {
      return 'foo from FooMixin'
    }

    woo(): string {
      return 'woo from WooMixin'
    }
  }
}

class ExtraClass extends mix(BaseClass).with(BooMixin, FooAndWooMixin) {
  constructor(msg1: string, msg2: string) {
    super(msg1, msg2)
  }

  hello(): string {
    return `${super.hello()} + ExtraClass`
  }
}

//========================================================================
//
//  Tests
//
//========================================================================

it('ベーシックケース', async () => {
  const extra = new ExtraClass('Hello', 'World')

  expect(extra.hello()).toBe('Hello World from BaseClass + ExtraClass')
  expect(extra.boo()).toBe('boo from BooMixin')
  expect(extra.foo()).toBe('foo from FooMixin')
  expect(extra.woo()).toBe('woo from WooMixin')
})
