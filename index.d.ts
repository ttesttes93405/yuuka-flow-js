
type TName = string;

type TPortName = string;

type FlowNode = {
    name: TName;
    outputPorts: {
        [key: TPortName]: TName;
    },
};

type FlowDocument = {
    entryNodeName: TName;
    nodes: {
        [key: TName]: FlowNode;
    };
};

type Activity<TState> = (state: TState) => PromiseLike<TPortName>;

type FlowExecutor<TState> = {
    execute: (state: TState) => PromiseLike<TState>;
};


declare namespace YuukaFlow {

    function createExecutor<TState>(flowDocument: FlowDocument, activities: { [key: TName]: Activity<TState> }): FlowExecutor<TState>;

}

export = YuukaFlow;