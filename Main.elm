module Main exposing (..)

import Html exposing (..)
import Html.App as Html
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)


main : Program Never
main =
    Html.beginnerProgram
        { model = model
        , update = update
        , view = view
        }



-- MODEL


type alias Model =
    { message : String
    }


model : Model
model =
    { message = "Hello World!"
    }



-- UPDATE


type Msg
    = ChangeMessage String
    | ClearMessage


update : Msg -> Model -> Model
update msg model =
    case msg of
        ChangeMessage newMessage ->
            { model | message = newMessage }

        ClearMessage ->
            { model | message = "" }



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ input
            [ placeholder "Typing here."
            , onInput ChangeMessage
            , value model.message
            ]
            []
        , button [ onClick ClearMessage ] [ text "Clear" ]
        , div [] [ text model.message ]
        ]
