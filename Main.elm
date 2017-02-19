module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (on, keyCode, onInput, onClick)
import Json.Decode as Json


main : Program Never Model Msg
main =
    beginnerProgram
        { model = model
        , update = update
        , view = view
        }



-- MODEL


onEnter : Msg -> Attribute Msg
onEnter msg =
    let
        isEnter code =
            if code == 13 then
                Json.succeed msg
            else
                Json.fail "not ENTER"
    in
        on "keydown" (Json.andThen isEnter keyCode)


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
    div [ class "wrapper" ]
        [ div
            [ class "message-area"
            ]
            [ text model.message ]
        , input
            [ placeholder "Typing here."
            , onInput ChangeMessage
            , onEnter ClearMessage
            , value model.message
            , maxlength 18
            , class "input-area"
            ]
            []
        , button
            [ onClick ClearMessage
            , class "clear-btn"
            ]
            [ text "Clear Message" ]
        , div
            [ class "prompt" ]
            [ text "Or press Enter to clear message" ]
        ]
