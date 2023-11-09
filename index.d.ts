
type TName = string;

type TPortId = string;

type FlowNode = {
    name: TName;
    outputPorts: {
        [key: TPortId]: TName;
    },
};

type FlowDocument = {
    entryNodeName: TName;
    nodes: {
        [key: TName]: FlowNode;
    };
};

type Activity<TState> = (state: TState) => PromiseLike<TPortId>;

type FlowExecutor<TState> = {
    execute: (state: TState) => PromiseLike<TState>;
};


declare namespace YuukaFlow {

    function createExecutor<TState>(flowDocument: FlowDocument, activities: { [key: TName]: Activity<TState> }): FlowExecutor<TState>;

}

export = YuukaFlow;