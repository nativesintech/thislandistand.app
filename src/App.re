module Styles = {
  open Css;
  let container = style([padding(px(20)), fontFamily("sans-serif")]);
  let card =
    style([
      maxWidth(px(500)),
      marginTop(px(20)),
      margin2(~v=px(0), ~h=auto),
      padding(px(20)),
      border(px(1), solid, hex("eee")),
      borderRadius(px(3)),
      boxShadow(
        Shadow.box(
          ~x=px(0),
          ~y=px(0),
          ~blur=px(2),
          ~spread=px(2),
          hex("eee"),
        ),
      ),
    ]);

  let header = value => style([color(hex(value))]);
  let content = style([color(hex("222"))]);
};

/* Make the component */
[@react.component]
let make = () => {
  <div className=Styles.container>
    <div className=Styles.card>
      <h1 className={Styles.header("222")}>
        "Reason React!"->ReasonReact.string
      </h1>
      <p className=Styles.content>
        {j|Type safe styles in Reason React FTW!  😎|j}->ReasonReact.string
      </p>
    </div>
  </div>;
};
