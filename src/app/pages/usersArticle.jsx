import { styled } from "solid-styled-components";

export default function usersArticle(context) {
  const Div = styled("div")`
    display: flex;
    flex-wrap: wrap;

    > img {
      margin: 10px;
    }
    > article {
      width: min-content;
      padding: 10px;
      text-align: center;
    }
  `;

  const Sp = styled("p")`
    font-size: 0.8em;
  `;

  return (props) => (
    <Div>
      <For each={props.usersData}>
        {(user) => (
          <article>
            <Sp>{user.email}</Sp>
            <img src={user.avatar} alt="user" />
          </article>
        )}
      </For>
    </Div>
  );
}
