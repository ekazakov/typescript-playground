// simplefies type display
type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] };

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

// sample 1 — ckech red type without Resolve
declare function pickChannels<Chan extends keyof Color>(
  c: Color,
  chan: Chan,
): Resolve<Pick<Color, Chan>>;

const c: Color = { r: 255, g: 128, b: 0, a: 0.5 };
const red = pickChannels(c, "r");

// sample 2
interface Select<
  TableT,
  WhereCols extends keyof TableT,
  SetCols extends keyof TableT
> {
  (
    where: Resolve<
      Pick<TableT, WhereCols> &
        { [K in SetCols]: Set<TableT[K & keyof TableT]> }
    >,
  ): Promise<TableT>;
}

type _Comment = {
  id: number;
  author_id: string;
  doc_id: string;
};

declare let selectComments: Select<_Comment, "author_id" | "doc_id", "id">;
declare const x: any;
selectComments(x);

// -------------------------------------------

interface SelectOne<TableT, Cols extends keyof TableT = keyof TableT> {
  (where: { id: string }): Pick<TableT, Cols>;
}

declare let getCommentById: SelectOne<_Comment>;
const comment = getCommentById({ id: "123" });
//    ^? const comment: Pick<Comment, keyof Comment>

// improved display
interface SelectOne2<TableT, Cols extends keyof TableT = keyof TableT> {
  (where: { id: number }): keyof TableT extends Cols
    ? TableT
    : Resolve<Pick<TableT, Cols>>;
}

declare let getCommentById2: SelectOne2<_Comment>;
const comment2 = getCommentById2({ id: 123 });
//    ^? const comment: Comment
