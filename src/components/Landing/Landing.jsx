import "./Landing.css"

const Landing = () => {
    return (
        //block in the center of the screen
        <div className="container d-flex">
            <div className="row landing">
                <div className="col-md-12">
                    <div className="jumbotron">
                        <h1 className="display-4">Simple Note</h1>
                        <p className="lead">Простое приложение для создания заметок</p>
                        <hr className="my-4" />
                        <p>Для начала работы зарегистрируйтесь или войдите в систему</p>
                        <a className="btn btn-warning btn-lg" href="/signup" role="button">Регистрация</a>
                        <br />
                        <a className="btn btn-warning btn-lg mt-2" href="/signin" role="button">Войти</a>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default Landing;
