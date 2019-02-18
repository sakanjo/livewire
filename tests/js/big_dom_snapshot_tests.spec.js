import { fireEventAndMakeServerRespondWithDom } from './utils'

test('test basic click', () => {
    document.body.innerHTML = `<div id="app">
        <div wire:root-id="componentA" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button></button>
            </form>
        </div>
    </div>`

    fireEventAndMakeServerRespondWithDom('button', 'click', document.querySelector(`[wire\\:root-id="componentA"]`))

    expect(document.body.outerHTML).toMatchSnapshot();
})

test('test adding element', () => {
    document.body.innerHTML = `<div id="app">
        <div wire:root-id="componentA" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button></button>
            </form>
        </div>
    </div>`

    fireEventAndMakeServerRespondWithDom('button', 'click',
        `<div wire:root-id="componentA" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <span>Something updated</span>
                <button>hey</button>
            </form>
        </div>`
    )

    expect(document.body.outerHTML).toMatchSnapshot();
})

test('test adding element with sibling components', () => {
    document.body.innerHTML = `<div id="app">
        <div wire:root-id="componentA" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button></button>
            </form>
        </div>

        <div wire:root-id="componentB" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button></button>
            </form>
        </div>
    </div>`

    fireEventAndMakeServerRespondWithDom('[wire:root-id="componentB"] button', 'click',
        `<div wire:root-id="componentB" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button>button</button>
                <div>something added</div>
            </form>
        </div>`
    )

    expect(document.body.outerHTML).toMatchSnapshot();
})

test('test adding element inside nested component', () => {
    document.body.innerHTML = `<div id="app">
        <div wire:root-id="componentA" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button></button>
            </form>

            <div wire:root-id="componentB" wire:root-serialized="empty">
                <form wire:submit="doSomething" wire:ref="submitEl">
                    <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                    <button></button>
                </form>
            </div>
        </div>
    </div>`

    fireEventAndMakeServerRespondWithDom('[wire:root-id="componentB"] button', 'click',
        `<div wire:root-id="componentB" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button>button</button>
                <div>something added</div>
            </form>
        </div>`
    )

    expect(document.body.outerHTML).toMatchSnapshot();
})

test('test adding element outside nested component', () => {
    document.body.innerHTML = `<div id="app">
        <div wire:root-id="componentA" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button></button>
            </form>

            <div wire:root-id="componentB" wire:root-serialized="empty">
                <form wire:submit="doSomething" wire:ref="submitEl">
                    <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                    <button></button>
                </form>
            </div>
        </div>
    </div>`

    fireEventAndMakeServerRespondWithDom('[wire:root-id="componentA"] button', 'click',
        `<div wire:root-id="componentA" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button>button</button>
                <div>something added</div>
            </form>

            <div wire:root-id="componentB" wire:root-serialized="empty">
            </div>
        </div>`
    )

    expect(document.body.outerHTML).toMatchSnapshot();
})

test('test removing nested component', () => {
    document.body.innerHTML = `<div id="app">
        <div wire:root-id="componentA" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button></button>
            </form>

            <div wire:root-id="componentB" wire:root-serialized="empty">
                <form wire:submit="doSomething" wire:ref="submitEl">
                    <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                    <button></button>
                </form>
            </div>
        </div>
    </div>`

    fireEventAndMakeServerRespondWithDom('[wire:root-id="componentA"] button', 'click',
        `<div wire:root-id="componentA" wire:root-serialized="empty">
            <form wire:submit="doSomething" wire:ref="submitEl">
                <div id="spinner" class="hidden" wire:loading="submitEl"></div>
                <button>button</button>
                <div>something added</div>
            </form>
        </div>`
    )

    expect(document.body.outerHTML).toMatchSnapshot();
})